export default async function streamToString (stream) {
    const chunks = [];
    for await(const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
}