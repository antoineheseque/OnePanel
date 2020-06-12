

//TODO: UPDATE LA PHRASE DANS LA BDD

const signe =getAstrologicalSign();
const phrase = setHoro();

function update_horoscope(){
    //update la phrase random correspond au signe

    //sql.request(`UPDATE \`Horoscope\` SET ${signe}='${phrase}' WHERE id=1`);

    var request = "UPDATE \`Horoscope\` SET ? = ? WHERE id=1"
    var completeRequest = mysql.format(request, [signe,phrase]);
    sql.request(completeRequest)

}

module.exports = {
    update_horoscope: () => {
        return update_horoscope()
    }
}


