const axios = require('axios');
const read = require('readline-sync');


axios.get('http://saral.navgurukul.org/api/courses').then((Response)=>{
    let courses_data = (Response.data.availableCourses)
    let count = 0
    let did_id =[]
    for(courses_dic of courses_data){
        count++
        // console.log(courses_dic)
        console.log(count, courses_dic.name)
        did_id.push(courses_dic.id)
    }
    // console.log(did_id)
    console.log("\n")
    var user_input =read.question("Please Enter your choice >");
    var U_choes = (did_id[user_input-1]);


    var exercises_url = "http://saral.navgurukul.org/api/courses/"+U_choes.toString()+"/exercises"
    axios.get(exercises_url).then((Response)=>{
        let exercises_data = (Response.data.data)
        let count = 0
        let dic_slug =[]
        for(exercises_dic of exercises_data){
            count++
            console.log("\n")
            console.log(count, exercises_dic.name)
            dic_slug.push(exercises_dic.slug)
        }
        console.log("\n")
        var user_second_input = read.question("Please enter your second choice >");
        var U_input = (dic_slug[user_second_input-1])


        var slug_url = "http://saral.navgurukul.org/api/courses/"+U_choes+"/exercise/getBySlug?slug="+U_input
        axios.get(slug_url).then((Response)=>{
            console.log("\n")
            console.log(Response.data.content)
        })

        .catch((err)=>{
            console.log(err+" third get")
        })
    })

    .catch((err)=>{
        console.log(err+" second get");
    })
})

.catch((err)=>{
    console.log(err+" first get");
})
