import cio from 'react-native-cheerio';
import axios from 'axios';

const uriBase = 'http://www.yaandyou.net/';

async function search(searchQuery) {
    // reconstruct the url
    const url = uriBase + "index_list.php?drugname=" + searchQuery;
    // create required body data
    var bodyFormData = new FormData();
    bodyFormData.append('searchya', searchQuery); 
    // make request with axios
    const res = await axios({
        method: 'post',
        url: url,
        data: bodyFormData
    });
    // return the data response
    return res.data;
}

async function getData(idx1, val1, idx2, val2) {
    // reconstruct the url
    const url = uriBase + "index_result.php";
    // create required body data
    var bodyFormData = new FormData();
    bodyFormData.append(idx1, val1); 
    bodyFormData.append(idx2, val2); 
    // make request with axios
    const res = await axios({
        method: 'POST',
        url: url,
        data: bodyFormData
    });
    // inspect the data as html with cheerio
    const $ = cio.load(res.data);
    // get specific value from the html
    var text = $('div.bs-callout').eq(5).text();
    // return as text
    return text;
}

async function Scraper(searchQuery) {
    console.log("! Scraper Started!");
    console.log("> searching for:", searchQuery);
    // get the result as html 
    const html = await search(searchQuery);
    // inspect the html
    const $ = cio.load(html);
    var forms = $('form');
    if(forms.length < 2){
        console.log("Error:",searchQuery,"Information not found!"); //ไม่เจอข้อมูลที่ท่าต้องการหา 
        return 0;
    }
    console.log("> searching",searchQuery,"successfully!")
    // getting value from the html
    var idx1 = $('form').eq(1).find('input').eq(0).attr('name');
    var val1 = $('form').eq(1).find('input').eq(0).val();
    var idx2 = $('form').eq(1).find('input').eq(1).attr('name');
    var val2 = $('form').eq(1).find('input').eq(1).val();
    // getting the whole information
    console.log("> getting information of", searchQuery);
    var text = await getData(idx1, val1, idx2, val2);
    console.log("> getting information successfully!")
    console.log("! Scraper Ended!");
    // return as text
    return text;
}

export default Scraper;