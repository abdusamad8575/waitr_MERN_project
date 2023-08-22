
const Restaurant = require('../model/restaurantModel')
const User = require('../model/userModel')


const adminAddRestorent = async (req, res) => {
    try {
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable, cuisines, restaurantType, id } = req.body;
        const images = req.files.map(file => file.filename);
        if(id && images) {
            
    // Parse array values
    const parsedMealsType = mealsType.split(',');
    const parsedDaysOfWeek = daysOfWeek.split(',');
    const parsedcuisines = cuisines.split(',');
    const parsedrestaurantType = restaurantType.split(',');
    // console.log(parsedDaysOfWeek.length);
    // let Table;
    // if(Array.isArray(addTable)){
    //     Table=addTable.map(table=>JSON.parse(table))
    // }else{
    //     Table = [JSON.parse(addTable)]
    // }
    // console.log("Table:-",Table);
    const img = images.map(img=>`http://localhost:8000/assets/${img}`)
        const restaurant = new Restaurant({  
            ownerId:id,
            restaurantName: restaurantName,
            location: location,
            startTime: startTime,
            endTime: endTime,
            mealsType: parsedMealsType.map(item=>item),
            daysOfWeek: parsedDaysOfWeek.map(item=>item), 
            cuisines: parsedcuisines.map(item=>item), 
            restaurantType: parsedrestaurantType.map(item=>item), 
            // addTable: Table.map(table => ({
            //     tableName: table.tableName,
            //     charCount: table.charCount,
            //     images: table.images.map(image =>image.name), 
            //   })),
            images: img ,
        })
        console.log("datas-",restaurant)
        await restaurant.save()
        await User.updateOne({_id:id},{$set:{restaurantId:restaurant._id}})
        return res.json({ message: 'Data saved successfully' });
        
    }
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}

const fetchRestaurant = async (req,res) =>{
    try {
       const userId = req.id
       const restaurant =  await User.findById(userId).populate('restaurantId')
          console.log("5464",restaurant);       
          if(!restaurant){
            return res.status(400).json({message:'data not fetch'})
        }else{
              return res.status(200).json({message:'restaurant data fetch saccessfully',restaurant})
          }

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });        
    }
}

     
module.exports = {
    adminAddRestorent,
    fetchRestaurant
}