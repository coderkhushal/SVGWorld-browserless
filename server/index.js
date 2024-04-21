const express =require("express")
const app = express()
const cors=  require("cors")
const bodyParser =require("body-parser")
const puppeteer = require('puppeteer');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
async function waitOneSecond() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000); // Wait for 1000 milliseconds (1 second)
  });
}

const port = 4000



app.get("/image/:query", async(req, res)=>
{
  // pupetteer
  const query= req.params.query
  
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://127.0.0.1:3000?token=6R0W53R135510',
    
    
  });

  const page = await browser.newPage();
  await page.goto('https://lucide.dev/icons/',{waitUntil: 'networkidle2'});
  // find element having class search
  let inputelement =await page.waitForSelector('.input');
  
  // type the query
  await inputelement.type(query);
  //wait for the search result
  await waitOneSecond();

  //find all element having class icon
  let svgelements = await page.$$('.icon span a ');
  console.log(svgelements.length)
  //get htmls of all svgs
  let svghtmls = [];
  for(let i=0;i<svgelements.length;i++)
  {
    let svghtml = await page.evaluate(element => element.innerHTML, svgelements[i]);
    svghtmls.push(svghtml);
  }


  // take a screenshot
  await page.screenshot({ path: 'image.png' });

  await browser.close();
  // send the image
  res.send(svghtmls);
  

})  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
