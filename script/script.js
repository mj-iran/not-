
const NOT=document.getElementById('not');
const BODY=document.querySelector('body');
const TEXT_HEDER=document.getElementById('text_heder');
const INPUT_TEXT=document.getElementById('input');
const ADD_NOTS=document.getElementById('add');

const whit_them=[" body-whit ",' heder_whit ',' bg-whit ',' bg-whit',' text-whites',' white'];
const dark_them=["body-dark",'heder_dark '," form_dark ",' bg-darks',' text-darks',' dark '];
const green_them=[" body-green ",' heder_green ',"form_green ",' bg-green',' text-green',' greene'];

let data_text_not=[] ;
let data_active_not=[];
let number_active=0;
let color_them;



const data_not_parse=()=>
{
    data_text_not=JSON.parse(localStorage.getItem("data_text_not"))
    data_active_not=JSON.parse(localStorage.getItem("data_active_not"))
}

const data_not_stringify=()=>
{
    localStorage.setItem("data_text_not", JSON.stringify(data_text_not))

    localStorage.setItem("data_active_not", JSON.stringify(data_active_not))
}


if(localStorage.getItem("font_size")===null)
{
    localStorage.setItem("font_size","h6")
}


if(localStorage.getItem("color_theme")===null)
{
    localStorage.setItem("color_theme","dark_them")
    
}




// --------------------------تم-------------------------------
//------------font size-----------
const text_size=(event)=>
{
 localStorage.setItem("font_size",event.path[0].localName)
 location.reload();
}
//-----------font size-----------//

//-----------color them----------
const them_ching=(color)=>
{
 localStorage.setItem("color_theme",color.dataset.them)
 location.reload();
}

const set_them=(()=>
{
    var color=localStorage.getItem("color_theme")
    
    switch (color) {
        case "whit_them":
            color_them=whit_them
            break;

            case "dark_them":
            color_them=dark_them
                
                
            break;  

                case "green_them":
                   
                    color_them=green_them
                    
                break;  
    
        default:
            console.log("error");

            break;

    }
 

})()
//-----------color them---------//
// -------------ching color body-----

BODY.classList.value="container "+color_them[0]
TEXT_HEDER.className+=" "+color_them[1]
INPUT_TEXT.className+=" "+color_them[2]
ADD_NOTS.className+=" "+color_them[2]


// -------------ching color body-----//


// --------------------------تم-----------------------------//



// --------------------------سورس ساخت نوت-----------------------
const sores_add_not=(text_not)=>{
   
    // ---------------قاب نوت-------------
    const col=document.createElement("div")
    col.setAttribute("class" ," col-5 col-lg-3 mb-3 ")
 
    
    

    col.setAttribute("onclick","ching(this)")
   const not_box=document.createElement("div")

   if(data_active_not[number_active]==="1")
   {
    data_not_parse()
    not_box.setAttribute("class","box_not  p-4 text-center  "+color_them[5])
    data_not_stringify()
   }
   else
   {
    not_box.setAttribute("class","box_not  p-4 text-center "+color_them[3])
   }
   number_active++


          // -------کلید حذف وت ---------------
    const not_remove=document.createElement("div")
    not_remove.setAttribute("class","d-flex justify-content-end ")
    not_remove.setAttribute("onclick","removes(event)")
    const centner_remove=document.createElement("div")
    centner_remove.setAttribute("class","remove text text-center ")
    const text_remove=document.createElement("h6")
    text_remove.innerHTML="X"


    // -----------متن نوت -----------------
 
    const text=document.createElement(localStorage.getItem("font_size"))
    text.setAttribute("class","box_text text-center text_not "+color_them[4])
    text.setAttribute("contenteditable","true")
    text.setAttribute("onblur","edit_text_save(event)")
    text.setAttribute("onclick","edit_text_active(event)")

    text.innerHTML=text_not
    

   //-------------ادقام سورس --------------
    centner_remove.appendChild(text_remove)
    not_remove.appendChild(centner_remove)
    not_box.appendChild(text)
    not_box.appendChild(not_remove)
    col.appendChild(not_box)
    NOT.appendChild(col)

 

}
// --------------------------سورس ساخت نوت-------------------//----

//----------------------ادد کردن نوت های ذخیره شده -----------

const chap_not=(()=>
{
    if (localStorage.getItem("data_text_not")!==null) {
        data_not_parse()

        data_text_not.forEach(value => {
            sores_add_not(value)
            
        });
    }
})()




//-------------------------ادد کردن نوت های ذخیره شده ---------//--


//------------------------active not-----------------------------

const active_not=()=>
{

}

//------------------------active not--------------------------//-





//----------------------------localStorage _ set ---------------------

const set_data=(value)=>
{
    
if (localStorage.getItem("data_text_not")!==null) {
    data_not_parse()
}
data_text_not.push(value)
data_active_not.push("0")
data_not_stringify()


}
//----------------------------localStorage _ set ---------------------


//----------------------------اضافه کردن نوت ی----------------------

//--------- Deleted space-------------
const not_text_value=(text_not)=>{
    let text = text_not
    text= text.trim()
    return text
}
//-----------Deleted space-------------



//-------add in button----------------
 const add_not=()=>{

   if(not_text_value(INPUT_TEXT.value).length>0)
   {
    
    sores_add_not(INPUT_TEXT.value)
    set_data(INPUT_TEXT.value)
    INPUT_TEXT.value=""
   }
}
//-------add in button----------------



//--------------enter-------------

const add_box_in_enter=(event)=>{
    let key =true
    if(event.key==="Enter")
    {
        add_not()
        key=false
    }
    return key
}

//-----------------enter----------///---

//----------------------------اضافه کردن نوت دستی----------------///------


//-------------------پاک کردن نوت ---------------------------
const removes=(event)=>
{
    let text_value=event.path[3].children[0].innerHTML
    data_not_parse()
    let number_data=data_text_not.indexOf(text_value)

    data_text_not.splice(number_data,1);
    data_active_not.splice(number_data,1);

    data_not_stringify()
    event.path[4].remove()
}
//-----------------پاک کردن نوت ---------------------//-----


//---------------------------فعال کردن نوت ---------------------------------
const ching=(active)=>
{
    data_not_parse()
    let number_data=data_text_not.indexOf(active.children[0].children[0].innerHTML)
  

    if( active.children[0].classList.value.search(color_them[5])>0)
    {
     
        data_active_not[number_data]="0"
        active.children[0].classList.value="box_not  p-4 text-center "+color_them[3]
    }
    else{
       
        active.children[0].classList.value="box_not  p-4 text-center "+color_them[5]
        data_active_not[number_data]="1"

    }

    data_not_stringify()
}
//---------------------------فعال کردن نوت -----------------------------///----


//----------------------------ویرایش متن -----------------------------///------


//-------------------متن اصلی ----------------------
const edit_text_active=(event)=>
{
    var text =event.target.innerHTML
    data_not_parse()
    var LS_number=data_text_not.indexOf(text)
    data_not_stringify()

     array_number=LS_number;
}
//-------------------متن اصلی -------------------///---

//------------------متن جدید ---------------------///---
const  edit_text_save=(event)=>
{
    let text_edit=not_text_value(event.target.innerHTML)  
    data_not_parse()
   if(text_edit.length===0)
   {
     event.target.innerHTML=data_text_not[array_number]
   }
    else
    {
        data_text_not[array_number]=text_edit
    }
    data_not_stringify()

}
//----------------------------ویرایش متن -----------------------------------

