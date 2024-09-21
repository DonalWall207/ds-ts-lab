import {
    ColleagueV2,
    Friend,
    Buddy,
    BuddyList,
    Administrator,
  } from "./myTypes";
  import { friends } from "./01-basics";

  const colleague1: ColleagueV2 = {
    name: "Ralph Graham",
    department: "Engineering",
    contact: {
      email: "rgraham@company.com",
      extension: 121,
    },
  };

  const colleague2: ColleagueV2 = {
    name: "Liam Lorton",
    department: "HR",
    contact: {
      email: "LLorton@company.com",
      extension: 131,
    },
  };

  // Function to create a BuddyList, optionally with an Administrator
function makeBuddyList(
    name: string,         
    buddies: Buddy[],    
    admin?: Administrator 
  ): BuddyList {
    return {
      name,                
      members: buddies,    
      administrator: admin 
    } as BuddyList;        
}


const myFootballBuddies = makeBuddyList(
    "Football team",          
    [colleague1, friends[0], colleague2],  
    colleague1                
);

const myBandBuddies = makeBuddyList(
    "Band name",              
    [colleague1, friends[1]]  
);

console.log(myFootballBuddies);
console.log(myBandBuddies);

// Function to find the contact information of a buddy by name in a BuddyList
function findBuddyContact(list: BuddyList, name: string): string | undefined {
    for (const buddy of list.members) {  
      if (buddy.name === name) {         
        if ("phone" in buddy) {         
          return buddy.phone;            
        } else {                         
          return buddy.contact.email;
        }
      }
      return undefined;  // If no match is found, return undefined
    }
}

console.log("Contact buddy at: ", findBuddyContact(myFootballBuddies, "Ralph Graham"));

//--------------------------------------

// Function to get all friends (those who have a phone property) from a BuddyList
function getBuddyListFriends(list: BuddyList): Friend[] {
    return list.members.filter((buddy) => "phone" in buddy) as Friend[];
    
}

console.log(getBuddyListFriends(myBandBuddies));