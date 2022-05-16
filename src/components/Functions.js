export const getOrderStatus = (status) => {
    switch (status) {
        case "pending": {
            return "รอดำเนินการ";
        }
        case "processing": {
            return " อยู่ในระหว่างส่งงานช่าง";
        }
        case "cutting": {
            return "กำลังตัด";
        }
        case "cut_completed": {
            return "ตัดเสร็จแล้ว";
        }
        case "sewing": {
            return "กำลังเย็บ";
        }
        case "sew_completed": {
            return "เย็บเสร็จแล้ว";
        }
        case "shipping": {
            return "กำลังจัดส่งสินค้า";
        }
        case "prepare_shipping": {
            return "สินค้าเตรียมจัดส่ง";
        }
        case "shipped": {
            return "สินค้าส่งแล้ว";
        }
        case null: {
            return "รอดำเนินการ";
        }
        default: {
            return status;
        }
    }
}