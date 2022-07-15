import CryptoJS from "crypto-js"

// encrypt single data
export const encrypt = (plain_data) => {
    const encrypted_data = CryptoJS.AES.encrypt(plain_data, process.env.CIPHER_KEY)
    return encrypted_data.toString()
}

// decrypt single data
export const decrypt = (encrypted_data) => {
    const decrypted_data = CryptoJS.AES.decrypt(encrypted_data, process.env.CIPHER_KEY)
    return decrypted_data.toString(CryptoJS.enc.Utf8)
}