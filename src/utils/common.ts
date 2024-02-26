import moment from "moment";


class Common {
    /**
     * Method to get a amount
     * @param bookPrice 
     * @param rentAmount 
     * @param operationType 
     * @returns 
     */
    getAmount (bookPrice, rentAmount, operationType="borrow") {
        let amount = 0;
        amount += Math.floor(Number(bookPrice) / 2);

        const totalAmount = amount + Number(rentAmount);

        console.log({jsonObject: {amount, totalAmount, bookPrice}, description: "Calculated Amount where amount is half of the original price of a book"})
        if (operationType === 'borrow') {
            return totalAmount;
        }
        return amount;
    }
    
    /**
     * Method to calculate rent amount
     * @param bookPrice 
     * @param isPremiumActive 
     * @returns 
     */
    calculateRentAmount (bookPrice, isPremiumActive) {
        let rentAmount = 0;
        const percentage = isPremiumActive ? Number(process.env.PERCENTAGE_5) : Number(process.env.PERCENTAGE_10);
        rentAmount = Number(bookPrice) / 100 * percentage;
        console.log({jsonObject: {isPremiumActive, bookPrice, rentAmount}, description: "Calculated rent amount"})
        return rentAmount;
    }

    /**
     * Method to calculate Due date
     * @param pages 
     * @param fromDate 
     * @returns 
     */
    calculateDueDate (pages, fromDate) {
        const formattedFromDate = moment(fromDate, "YYYY-MM-DD");
        const dueDaysCount = Number(pages) > 500 ? Number(process.env.PAGES_500_1000) : Number(process.env.PAGES_100_500);
        const dueDate = moment(formattedFromDate).add(dueDaysCount, "days").format('YYYY-MM-DD');
        console.log({jsonObject: {pages, fromDate, dueDate}, description: "Calculated due date for book return..."})
        return dueDate;
    }

    /**
     * A method to check the due time extension
     * @param endDate 
     * @returns 
     */
    isDueTimeExtended = (endDate): Boolean => {
        const today = moment().format('YYYY-MM-DD');
        const checkDueDate = this.differenceIn2Dates(endDate, today);

        if (checkDueDate >= 0) {
            return true
        } else {
            return false;
        }
    }

    /**
     * A method to give the difference between two dates
     * @param startDate 
     * @param endDate 
     * @returns 
     */
    differenceIn2Dates = (startDate, endDate) => {
        const newEndDate = moment(endDate).format('YYYY-MM-DD');
        const difference = moment(startDate, 'YYYY-MM-DD').diff(newEndDate, 'days');
        return difference;
    }
}

export const common = new Common();