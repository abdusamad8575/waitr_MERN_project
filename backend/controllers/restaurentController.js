
const Restaurant = require('../model/restaurantModel')


const adminAddRestorent = async (req, res) => {
    try {
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable } = req.body;
    const images = req.files.map(file => file.filename);
    console.log("image:-",images);
    // Parse array values
    const parsedMealsType = mealsType.split(',');
    const parsedDaysOfWeek = daysOfWeek.split(',');
    // let Table;
    // if(Array.isArray(addTable)){
    //     Table=addTable.map(table=>JSON.parse(table))
    // }else{
    //     Table = [JSON.parse(addTable)]
    // }
    // console.log("Table:-",Table);
    const img = images.map(img=>`http://localhost:8000/assets/${img}`)
        const restaurant = new Restaurant({  
            restaurantName: restaurantName,
            location: location,
            startTime: startTime,
            endTime: endTime,
            mealsType: parsedMealsType.map(item=>item),
            daysOfWeek: parsedDaysOfWeek.map(item=>item), 
            // addTable: Table.map(table => ({
            //     tableName: table.tableName,
            //     charCount: table.charCount,
            //     images: table.images.map(image =>image.name), 
            //   })),
            images: img ,
        })
        console.log("datas-",restaurant)
        const RestaurantDetails = await restaurant.save()
        res.json({ message: 'Data saved successfully', data: RestaurantDetails });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}



module.exports = {
    adminAddRestorent
}