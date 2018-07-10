const config = {
  
  "ownerID": "YOUR ID",

  "admins": ["MUST BE ID <Not your id>"],

  "helpers": ["MUST BE ID <Not your id>"],
  
  "donators": ["MUST BE ID <Not your id>"],
  
  "supporters": ["MUST BE ID <Not your id>"],
  
  "token": process.env.TOKEN, //your token file
  
  "defaultSettings" : {
    "prefix": ".",
    "modRole": "Moderators",
    "adminRole": "Administrators",
    "systemNotice": "true",
  },


  permLevels: [
    { level: 0,
      name: "Users", 
      check: () => true
    },
    
    { level: 2,
      name: "Moderators",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrators", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owners", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner === message.author.id ? true : false) : false
    },

    { level: 7,
      name: "Bot Supporters",
      check: (message) => config.supporters.includes(message.author.id)
    },
    
    { level: 8,
      name: "Bot Helpers",
      check: (message) => config.helpers.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admins",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owners", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;