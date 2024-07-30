const fs = require("fs");

function CreateServer(servername, forceCreate) {

  if (!servername) {
    servername = "my-server";
  }

  servername = servername.toLowerCase();
  servername = servername.toString();

  function callback(error) {
    if (error) {
      console.error(`Error creating directory ${servername}:`, error);
    }
  }

  const SAoAogNaJSonData = {
    appname: servername,
    appversion: 1.0,
    root: "..",
    express: "",
  };

  const CreateFiles = () => {
    fs.writeFileSync(
      `${servername}/Json/${servername}.json`,
      JSON.stringify(SAoAogNaJSonData, null, 2) 
    );
  };

  const CreateFolders = () => {
    const folders = [
      "",
      "/APIS",
      "/Router",
      "/Data-Scheme",
      "/Controller",
      "/Database",
      "/Json",
        "/plugins"
    ];

    folders.forEach((folder) => {
      fs.mkdir(servername + folder, { recursive: true }, callback);
    });

    CreateFiles();
  };

  if (forceCreate === true) {
    if (!fs.existsSync(servername)) {
      CreateFolders();
    } else {
      console.log(`Sorry, Your server '${servername}' already exists!`);
    }
  } else {
    CreateFolders();
  }
}

const Backend = {
  createServer: (servername, forceCreate) => {
    CreateServer(servername, forceCreate);
  },
};

module.exports = {
  Backend,
};
