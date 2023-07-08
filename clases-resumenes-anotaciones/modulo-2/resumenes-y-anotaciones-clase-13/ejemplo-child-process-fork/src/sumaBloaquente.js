export default function suma() {
    let result = 0;

    for (let index = 0; index < 5e9; index++) {
        result += index;
    };

    return result;
};