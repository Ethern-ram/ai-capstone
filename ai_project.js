import Replicate from "replicate";
import readline from "readline";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// bikin interface buat input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan teks edukasi yang mau diringkas:\n", async (text) => {
    const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: text, // <- teks yang dimasukkan
    max_tokens: 512,
    temperature: 0.6,
    system_prompt: "You are an AI that summarizes educational text into concise, structured study notes.\nAlways use bullet points or numbered lists. Keep it short, clear, and student-friendly.",
    presence_penalty: 0,
    frequency_penalty: 0
    };

    for await (const event of replicate.stream("ibm-granite/granite-3.3-8b-instruct", { input })) {
    process.stdout.write(event.toString());
    }

    rl.close();
});
