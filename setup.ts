import { randomBytes } from "crypto";
import { $, write } from "bun";
import colors from "picocolors"
import { intro, note, outro, password, select, text } from '@clack/prompts';
import { Client } from "pg";

console.clear();

let envContent = `# Seeded by Foundry Setup\n# Do NOT share this information!\n\n`;

intro(colors.inverse(` Foundry Setup `));
note(colors.yellowBright(`
Hello, welcome to Foundry!
Today, we'll be setting up the core environment, but we require a few details from you first.      
`))
const dbURL = await text({
    'message': colors.greenBright(`What's your postgres database URL?`),
    'placeholder': "postgres://postgres:password@localhost:5432/root",
    'validate': (value) => {
        if ((!value?.startsWith("postgres://") && !value?.startsWith("postgresql://")) || !value?.includes("@") || !value?.includes(":") || !value?.includes("/")) {
            return "This isn't a valid postgres URL";
        }
    }
});
// Run validation
try {
    const client = new Client({
        connectionString: dbURL,
    })
    await client.connect().then(() => {
        client.end();
    });
} catch (e) {
    note(colors.yellowBright(`Warning: we couldn't connect to that database, did you provide a valid connection string? You'll be able to fix this at the review stage when you review the .env.\nMoving on.`))
}

envContent += `DB_URL="${dbURL}"\n`;

const authMethod = await select({
    'message': colors.blueBright(`Next, pick your flavor of authentication!`),
    options: [
        {
            value: 'discord',
            label: 'Discord OAuth (Only Option for Now)',
        }
    ]
});

if (authMethod === "discord") {
    note(colors.greenBright(`Excellent pick. Now, head over to https://discord.com/developers/home and make sure you created an application, we're going to need a few more details from you.`));
    const discordClientID = await text({
        'message': colors.greenBright(`What's your Discord Client ID?`),
        'placeholder': "332269999912132097",
        'validate': (value) => {
            if (!value || value.length != 19) {
                return "This doesn't seem to be a valid Discord Client ID.";
            }
        }
    });
    const discordClientSecret = await password({
        'message': colors.greenBright(`What's your Discord Client Secret?`),
        'validate': (value) => {
            if (!value || value.length != 32) {
                return "This doesn't seem to be a valid Discord Client Secret.";
            }
        }
    })
    envContent += `discordClientID = "${discordClientID}"\ndiscordClientSecret="${discordClientSecret}"\n`;
}

note(colors.cyanBright(`For security with authenticated user data in the session, we're generating a random TOKEN_SECRET for you.
Please review the generated .env file (which you can find in the current working directory) and adjust the content of the variables if necessary, then come back and affirm that everything looks good to continue.
`))

envContent += `TOKEN_SECRET="${randomBytes(64).toString("ascii")}"\n`;
write(".env", envContent);
await select({
    'message': colors.greenBright("Does everything look good?"),
    options: [
        {
            'value': 'continue',
            'label': "Yep!",
        }
    ]
})

const encryptionChoice = await select({
    'message': colors.greenBright("Finally, would you like us to encrypt the .env file for you? (Highly Recommended)"),
    options: [
        {
            'value': 'yes',
            'label': "Yes!",
        },
        {
            'value': 'no',
            'label': "No, it's fine."
        }
    ]
})

if (encryptionChoice === "yes") {
    await $`dotenvx encrypt`
    note(colors.greenBright("Great! We've encrypted your .env file successfully."));
} else {
    note(colors.yellowBright("Alright, please be careful with your .env file!"))
}

outro(colors.inverse(`
You're all set! Foundry is now ready for you to start predicting!
`))

// appendFile(".env", `\nTOKEN_SECRET="${randomBytes(32).toString("hex")}"\n`, err => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });
// $`bun dotenvx encrypt`;

// $`bunx dotenvx set TOKEN_SECRET ${randomBytes(32).toString("hex")}`;
// $`bunx dotenvx encrypt`