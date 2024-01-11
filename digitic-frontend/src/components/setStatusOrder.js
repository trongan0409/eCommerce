export const setStatus = (status) => {
    // eslint-disable-next-line default-case
    switch (status) {
        case "Comfirming":
            return {
                color: "#108ee9",
                label: "Comfirming",
            };
        case "Delivering":
            return {
                color: "#87d068",
                label: "Delivering",
            };
        case "Delivered":
            return {
                color: "#2db7f5",
                label: "Delivered",
            };
        case "Canceled":
            return {
                color: "red",
                label: "Canceled",
            };
        default:
            return {
                color: '',
                label: ''
            }
    }
};