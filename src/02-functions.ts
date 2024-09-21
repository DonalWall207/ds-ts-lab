import { Friend, Colleague, EmailContact } from './myTypes'  
import { friends, colleagues } from "./01-basics";            

// Function to incresase a friend's age by 1 and return a string with the updated age
function older(f: Friend) {
    f.age += 1
    return `${f.name} is now ${f.age}`  // Return updated age with the name
}

// Function to increace the age of all friends in the array by 1 and return an array strings
function allOlder(f: Friend[]) {
    let j : string[] = []  // Create an empty array to store strings
    for(let i = 0; i < f.length; i++){  
        f[i].age += 1;                  

        j.push(f[i].name + " is now " + f[i].age)
    }
    return j;  
}

console.log(allOlder(friends))

// Function to find the colleague with the highest extension number
function highestExtension(cs: Colleague[]) { 
    const result = cs.sort(  // Sort the array of colleagues by their contact extensions in ascending order
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];  
}

// Function to sort colleagues by a given sorting function, return a limited number of EmailContact objects
function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,  // Sorting function
    max? : number  
  ): EmailContact[] {
    let end = colleagues.length;  
    if (max !== undefined) {      
       end = max < 2 ? 1 : max    
    }
    const sorted = colleagues.sort(sorter);  
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));  
    return fullResult.slice(0,end)  
  }

  
  console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));


  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));

  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); 

// Function to add a new colleague to the colleagues array
function addColleague(cs: Colleague[], name: string, department: string, email:string){
    let newColleague : Colleague = {
        name: name,
        department: department,
        contact: {
            email: email,
            // Set the extension of the new colleague to one higher than the highest existing extension
            extension: highestExtension(cs).contact.extension += 1        
        }
    } 
    cs.push(newColleague);  // Add the new colleague to the colleagues array
}

// Function to find friends matching a filter function and return their names in an array
function findFriends(
    friends : Friend[],
    filter: (f1: Friend) => boolean) : string[] {  
        const filtered = friends.filter(filter)  
        const result: string[] = filtered.map((m) => m.name)  
        return result; 
    }


console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));

console.log(findFriends(friends, (friend) => friend.age < 35));

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));
