export const getPlainMessage = (msg) => {
    return msg.split('</p>')[0].replace('<p>', '').trim();
}