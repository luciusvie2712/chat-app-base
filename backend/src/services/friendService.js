import User from "../models/User.js"
import Friend from "../models/Friend.js"
import FriendRequest from "../models/FriendRequest.js"

export const sendFriendRequestService = async (from, to, message) => {
    try {
        const userExists = await User.exists({_id: to})
        if (!userExists) {
            return {
                Ec: -1,
                Mes: "The user does not exist."
            }
        }

        let userA = from.toString()
        let userB = to.toString()
        if (userA > userB) {
            [userA, userB] = [userB, userA]
        }

        const [alreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({userA, userB}),
            FriendRequest.findOne({
                $or: [
                    {from, to},
                    {from: to, to: from}
                ]
            })
        ])

        if (alreadyFriends) {
            return {
                Ec: 1,
                Mes: "The two users were already friends."
            }
        }
        if (existingRequest) {
            return {
                Ec: 1,
                Mes: "Friend requests have been sent to this user."
            }
        }

        const request = await FriendRequest.create({
            from,
            to,
            message
        })

        return {
            Ec: 0,
            Mes: "Friend request successfully sent.",
            dataRequest: request
        }
    } catch (error) {
        console.error("An error occurred in sendFriendRequestService.", error)
        return {
            Ec: -1,
            Mes: "An error occurred during the service processing."
        }
    }
}

export const acceptFriendRequestService = async (requestId, userId) => {
    try {
        const requestExists = await FriendRequest.findById(requestId)
        if (!requestExists) {
            return {
                Ec: -1,
                Mes: "No friend requests found."
            }
        }
        if (requestExists.to.toString() !== userId.toString()) {
            return {
                Ec: -2,
                Mes: "You do not have the right to accept friend requests."
            }
        }

        const accpetFriend = await Friend.create({
            userA: requestExists.from,
            userB: requestExists.to
        })
        await FriendRequest.findByIdAndDelete(requestId)

        const from = await User.findById(requestExists.from).select("_id displayName avatarUrl").lean()
        return {
            Ec: 0,
            Mes: "You have successfully accepted the friend request.",
            newFriend: {
                _id: from?._id,
                displayName: from?.displayName,
                avatarUrl: from?.avatarUrl
            }
        }
    } catch (error) {
        console.error("An error occurred in acceptFriendRequestService.", error)
        return {
            Ec: -1,
            Mes: "An error occurred during the service processing."
        }
    }
}

export const declineFriendRequestService = async (requestId, userId) => {
    try {
        const request = await FriendRequest.findById(requestId)
        if (!request) {
            return {
                Ec: -1,
                Mes: "The friend request does not exist."
            }
        }
        if (request.to.toString() !== userId.toString()) {
            return {
                Ec: -2,
                Mes: "You don't have the right to refuse a friend request."
            }
        }
        
        await FriendRequest.findByIdAndDelete(requestId)
        return {
            Ec: 0,
            Mes: "Successfully declined the friend request."
        }
    } catch (error) {
        console.error("An error occurred in declineFriendRequestService.", error)
        return {
            Ec: -1,
            Mes: "An error occurred during the service processing."
        }
    }
}

export const getAllFriendService = async (userId) => {
    try {
        const friendShip = await Friend.find({
            $or: [
                { userA: userId },
                { userB: userId }
            ]
        }).populate("userA", "_id displayName avatarUrl").populate("userB", "_id displayName avatarUrl")

        if (!friendShip.length) {
            return {
                Ec: 0,
                friends: []
            }
        }
        const friends = friendShip.map((f) => f.userA._id.toString() === userId.toString() ? f.userB : f.userA)
        return {
            Ec: 0,
            friends
        }
    } catch (error) {
        console.error("An error occurred in getAllFriendService.", error)
        return {
            Ec: -1,
            Mes: "An error occurred during the service processing."
        }
    }
}

export const getFriendRequestService = async (userId) => {
    try {
        const populateFields = "_id username displayName avatarUrl"
        const [sent, received] = await Promise.all([
            FriendRequest.find({ from: userId }).populate("to", populateFields),
            FriendRequest.find({ to: userId }).populate("from", populateFields)
        ])
        return {
            Ec: 0,
            sent,
            received
        }
    } catch (error) {
        console.error("An error occurred in getFriendRequestService.", error)
        return {
            Ec: -1,
            Mes: "An error occurred during the service processing."
        }
    }
}