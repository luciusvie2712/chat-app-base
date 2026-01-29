
export const getUser = async (req, res) => {
    try {
        const user = req.user
        
        return res.status(200).json({
            Ec: 0,
            Mes: "Get user successfully",
            data: user
        })
    } catch (error) {
        console.error("Error getUser controller:", error)
        return res.status(500).json({ Mes: "Initial error server"})
    }
}
