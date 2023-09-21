const searchData  = (search,datas) =>{
    if(search){
        console.log(search, datas)
        const regex = new RegExp(search, 'i'); // 'i' for case-insensitive
        const filteredResults = datas.filter(item => 
          regex.test(item.foodName) 
        );
        // setDatas(filteredResults)
        console.log(filteredResults);
        return filteredResults
      }
}

export default searchData