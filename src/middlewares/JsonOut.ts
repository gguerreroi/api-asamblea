export const JsonOut = (Code: string, Message: string, Data: any = null) => {
    return {
        state: {
            Code: Code,
            Message: Message
        },
        data: Data
    }
}