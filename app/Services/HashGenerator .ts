import User from "App/Models/User";


class HashGenerator {
    constructor() {

    }

    // This method generates a hash from a string
    public async methodHash(textos: string): Promise<string> {
        // Divide the text into segments
        const charactersPerSegment = Math.ceil(256 / textos.length);
        // Create a hash result
        let hashResult = '';
        // For each character, get the ASCII value
        for (let i = 0; i < textos.length; i++) {
            // Get the ASCII value of the character
            const char = textos.charCodeAt(i);
            // Transform the value
            let textPerChar = 0;
            // Create a string to store the characters
            let cadenaperchar = '';
            // For each character, get the transformed value
            for (let j = 0; j < charactersPerSegment; j++) {
                // Transform the value
                const transformedValue = ((char * 3751) + char) * (charactersPerSegment * (textos.charCodeAt(i - i)));
                // Add the transformed value to the text per
                textPerChar += transformedValue;
                // Get the ASCII value
                let ASCII: number;
                // If the text per character is greater than 2
                if (textPerChar.toString().length > 2) {
                    // Get the last two characters
                    textPerChar = parseInt(textPerChar.toString().slice(2));
                    // Get the ASCII value
                    ASCII = parseInt(textPerChar.toString().slice(0, 2));
                    // If the text per character is greater than 1
                } else if (textPerChar.toString().length > 1) {
                    // Get the last character
                    ASCII = parseInt(textPerChar.toString().slice(0, 1));
                    // Get the last character
                    textPerChar = parseInt(textPerChar.toString().slice(1));
                    // If the text per character is less than 1
                } else {
                    // Get the ASCII value
                    ASCII = j;
                }
                // If the ASCII value is between 32 and 126
                if (ASCII >= 32 && ASCII <= 126) {
                    // Get the character
                    const char = String.fromCharCode(ASCII);
                    // Add the character to the string
                    cadenaperchar += char;
                    // If the ASCII value is less than 32
                } else {
                    // Add an asterisk to the string
                    cadenaperchar += '*';
                }
            }
            // Add the string to the hash result
            hashResult += cadenaperchar;
        }

        // Return the hash result
        return hashResult;
    }

    // This method verifies the user
    public async verifyUser(email: string, password: string): Promise<User | null> {
        // Find the user by email
        try {
            // Find the user by email
            const user = await User.findBy('email', email);
            // If the user is not found
            if (!user) {
                // Return null
                return null;
            }
            // Generate the hash of the password
            const hashedPassword = await this.methodHash(password);
            // If the password is correct
            if (hashedPassword === user.password) {
                // Return the user
                return user;
            } else {
                // Return null
                return null;
            }
        } catch (error) {
            // Throw the error
            throw error;
        }
    }
}

export default HashGenerator;
