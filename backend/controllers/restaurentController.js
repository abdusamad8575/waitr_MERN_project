
const Restaurant = require('../model/restaurantModel')


const adminAddRestorent = async (req, res) => {
    try {
        // console.log("restarant",req.body);
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable } = req.body;
        console.log(restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable )
    const images = req.files.map(file => file.path);
    console.log("image:-",images);
    // console.log("img:-",img);
    // const filepath = req.file.path.replace(/\\/g, '/').slice(7);
    //   console.log("filepath",filepath);
    // Parse array values
    const parsedMealsType = mealsType.split(',');
    const parsedDaysOfWeek = daysOfWeek.split(',');
    let Table;
    if(Array.isArray(addTable)){
        Table=addTable.map(table=>JSON.parse(table))
    }else{
        Table = [JSON.parse(addTable)]
    }
    // console.log("Table:-",Table);
    
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
                images: table.images.map(image =>image.name), 
              })),
            // images: images.map(img=>`http://localhost:8000/${filepath}`) ,
        })
        console.log("datas-",restaurant.addTable.images[0])
        // const RestaurantDetails = await restaurant.save()
        // res.json({ message: 'Data saved successfully', data: RestaurantDetails });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}



module.exports = {
    adminAddRestorent
}