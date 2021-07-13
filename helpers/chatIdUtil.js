
exports.chatIdGenerator = (phoneA, phoneB) => {
    return (Number(phoneA) > Number(phoneB)) ? phoneA + phoneB : phoneB + phoneA;
};
