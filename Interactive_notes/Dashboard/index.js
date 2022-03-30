const cardData=[
    {heading:"heading 1", content:"I am first one",id:1},
    {heading:"heading 2", content:"I am second one",id:2},
    {heading:"heading 3", content:"I am third one",id:3},
    {heading:"heading 4", content:"I am fourth one",id:4},
    {heading:"heading 1", content:"I am first one",id:5},
    {heading:"heading 1", content:"I am first one",id:6},
    {heading:"heading 1", content:"I am first one",id:7}
];
const cardcontainer=document.querySelector('.card-container');
console.log(cardcontainer);

const createnotes = (array)=>
{
    array.forEach(cardobj => {
     const {heading,content,id}=cardobj;
     console.log(cardobj)
     const card=document.createElement("div");
     card.classList.add("card");
     card.id=id;
     const insidehtml=`<div class="card-header"><div class="card-heading">${heading}</div><div class="card-editing"> Edit Card</div></div><div class="card-content">${content}</div></div>`;
    card.innerHTML=insidehtml;
    console.log(card);
    cardcontainer.appendChild(card);
    });
    console.log("i am in")
};
createnotes(cardData)
