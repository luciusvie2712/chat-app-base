import { acceptFriendRequestService, declineFriendRequestService, getAllFriendService, getFriendRequestService, sendFriendRequestService } from "../services/friendService.js"

// gui yeu cau ket ban 
export const sendFriendRequest = async (req, res) => {
    try {
        const { to, message } = req.body
        const from = req.user._id
        if (from.toString() === to.toString()) {
            return res.status(400).json({
                Ec: -1,
                Mes: "Unable to send the new version to myself."
            })
        }
        const resData = await sendFriendRequestService(from, to, message)
        if (resData.Ec === -1) {
            return res.status(404).json({
                Ec: -1,
                Mes: resData.Mes
            })
        } else if (resData.Ec === 1) {
            return res.status(409).json({
                Ec: 1,
                Mes: resData.Mes
            })
        }
        return res.status(201).json({
            Ec: 0,
            Mes: resData.Mes,
            data: resData.dataRequest 
        })
    } catch (error) {
        console.error("An error occurred while sending the friend request.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System error"
        })
    }
}

// chap nhan loi moi ket ban 
export const acceptFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params
        const userId = req.user._id
        const resData = await acceptFriendRequestService(requestId, userId)
        if (resData.Ec === -2) {
            return res.status(403).json({
                Ec: -1,
                Mes: resData.Mes
            })
        } else if (resData.Ec === -1) {
            return res.status(404).json({
                Ec: -1,
                Mes: resData.Mes
            })
        }

        return res.status(200).json({
            Ec: 0,
            Mes: resData.Mes,
            data: resData.newFriend
        })
    } catch (error) {
        console.error("An error occurred while accepting the friend request.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System error"
        })
    }
}

// tu choi loi moi ket ban 
export const declineFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params
        const userId = req.user._id
        const resData = await declineFriendRequestService(requestId, userId)
        if (resData.Ec === -1) {
            return res.status(404).json({
                Ec: -1,
                Mes: resData.Mes
            })
        } else if (resData.Ec === -2) {
            return res.status(403).json({
                Ec: -1,
                Mes: resData.Mes
            })
        }

        return res.status(200).json({
            Ec: 0,
            Mes: resData.Mes
        })
    } catch (error) {
        console.error("An error occurred while rejecting the friend request.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System error"
        })
    }
}

// lay danh sach ban be hien tai 
export const getAllFriends = async (req, res) => {
    try {
        const userId = req.user._id
        const resData = await getAllFriendService(userId)
        if (resData.Ec === 0) {
            return res.status(200).json({
                Ec: 0,
                Mes: "The friend list has been successfully retrieved.",
                data: resData.friends
            })
        } else {
            return res.status(404).json({
                Ec: -1,
                Mes: resData.Mes
            })
        }
    } catch (error) {
        console.error("An error occurred while retrieving the friend list.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System Error"
        })
    }
}

// lay danh sach yeu cau ket ban 
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id
        const resData = await getFriendRequestService(userId)
        if (resData.Ec === 0) {
            return res.status(200).json({
                Ec: 0,
                Mes: "Get the curved list of friend requests.",
                data: {
                    sent: resData.sent,
                    received: resData.received
                }
            })
        } else {
            return res.status(404).json({
                Ec: -1,
                Mes: "An error occurred while retrieving the list of friend requests."
            })
        }
    } catch (error) {
        console.error("An error occurred while retrieving the list of friend requests.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System Error"
        })
    }
}
