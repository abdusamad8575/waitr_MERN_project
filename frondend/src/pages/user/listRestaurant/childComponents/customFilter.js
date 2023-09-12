
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
if(filter?.search){
  console.log(filter.search)
  const regex = new RegExp(filter.search, 'i'); 
  const filteredResults = filterdData.filter(item => 
    regex.test(item.restaurantName) 
  );
  filterdData = filteredResults
}

  return (
    filterdData
  )
}

export default customFilter
