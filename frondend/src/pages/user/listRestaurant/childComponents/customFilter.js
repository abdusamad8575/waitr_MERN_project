
const customFilter = (data, filter, location) => {
  let filterdData = data
  console.log(data, filter, location);
  const restaurantType = filter?.RestaurantType ?? []
  const cuisines = filter?.cuisines ?? []
  console.log(cuisines);

  if (location) {
    const datas = data.filter((value) => {
      return value.location === location
    })
    filterdData = datas;
  }

  if (restaurantType.length) {
    const data = filterdData.filter((value) => {
      const newdata = value.restaurantType.filter(element => {
        return restaurantType.includes(element)
      })
      return newdata.length ? newdata : ''
    }
    );
    filterdData = data
  }

  if (cuisines.length) {
    const data = filterdData.filter((value) => {
      const newdata = value.cuisines.filter(element => {
        return cuisines.includes(element)
      })
      return newdata.length ? newdata : ''
    }
    );
    filterdData = data
  }
  

  return (
    filterdData
  )
}

export default customFilter
