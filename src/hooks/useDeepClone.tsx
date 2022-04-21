
export const useDeepClone = () => {
    const deepClone = (clonedData: any): any => {
    //判断拷贝的obj是对象还是数组
        let objClone = Array.isArray(clonedData) ? [] : {};
        //obj不能为空，并且是对象或者是数组 因为null也是object
        if (clonedData && typeof clonedData === "object") {
            for (let key in clonedData) {
                if (clonedData.hasOwnProperty(key)) {
                    //obj里面属性值不为空并且还是对象，进行深度拷贝
                    if (clonedData[key] && typeof clonedData[key] === "object") {
                        //递归进行深度的拷贝
                        objClone[key] = deepClone(clonedData[key]);
                    } else {
                        objClone[key] = clonedData[key]; //直接拷贝
                    }
                }
            }
        }
        return objClone;
    };

    return { deepClone };
};
