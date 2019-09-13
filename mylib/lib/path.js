
const path = require('path');

export const convertAbsolutePath = (rout) => {
    return path.resolve(rout)
};

export const readPath = (rout ) => {
    return path.isAbsolute(rout)
};
