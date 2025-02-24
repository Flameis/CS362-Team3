const fs = require('fs');
const {JSDOM} = require('jsdom');

function textContentNonRecursive(element) {
    let text = "";
    for (let node of element.childNodes) {
        if (node.nodeType === 3) { // Node.TEXT_NODE
            text += node.nodeValue;
        }
    }
    return text;
}

async function parseLetter(letter,full_list) {
    let url = `https://landscapeplants.oregonstate.edu/species/${letter}`
    console.log(url);
    let res = await fetch(url);
    let dom = new JSDOM(await res.text());
    
    let list = dom.window.document.querySelectorAll('.views-row');
    // let list = dom.window.document.querySelector('[role="tablist"]').querySelectorAll('.views-row');
    for (itm of list) {
        let a = itm.querySelector('a');
        let data = {genus:undefined,species:undefined};
        [data.genus,data.species] = [...a.querySelectorAll('em')].map(x=>x.textContent.trim());
        try {
            data.sub_species = textContentNonRecursive(a).trim().match(/'(.+)'/)[1];
        } catch (error) {
            // console.log(a.textContent+' has bad sub_species');
        }
        try {
            data.common_name = a.querySelector('span.common-name').textContent.match(/\((.+)\)/)[1].trim();
        } catch (error) {
            console.log(a.textContent+' has no common name');
        }
        data.href = "https://landscapeplants.oregonstate.edu"+a.href;
        full_list.push(data);
    }
}

async function main(){

    var full_list = new Array();

    for (letter of 'abcdefghijklmnopqrstuvwxyz') {
        await parseLetter(letter,full_list)
    }


    fs.writeFile('landscapeplants.json',JSON.stringify(full_list,null,2), err => {
        if (err) {
            console.error('Error: writing landscapeplants.json', err);
        } else {
            console.log('wrote landscapeplants.json');
        }
    });

}

main();