
const Restaurant = require('../model/restaurantModel')


const adminAddRestorent = async (req, res) => {
    try {
        // console.log("restarant");
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable } = req.body;
    // const images = req.files.map(file => file.path);
    // const filepath = req.file.path.replace(/\\/g, '/').slice(7);
    //   console.log("filepath",filepath);
     // Parse array values
     const parsedMealsType = mealsType.split(',');
     const parsedDaysOfWeek = daysOfWeek.split(',');
     const Table=addTable.map(table=>JSON.parse(table))
    console.log(restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable,images )
    console.log("samad",images);
        const restaurant = new Restaurant({  
            restaurantName: restaurantName,
            location: location,
            startTime: startTime,
            endTime: endTime,
            mealsType: parsedMealsType.map(item=>item),
            daysOfWeek: parsedDaysOfWeek.map(item=>item),
            addTable: Table.map(table => ({
                tableName: table.tableName,
                charCount: table.charCount,
                // images: table.images.map(image =>console.log(image)), 
              })),
            // images: images.map(img=>`http://localhost:8000/${filepath}`) ,
        })
        // console.log("datas-",restaurant)
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