//http://localhost:1300/missingStudent
exports.missingStudent = (req, res) => {
  let x = req.query;
  let missing = [];
  try {
    for (let i = 0; i < x.names.length; i++) {
      if (x.queues[x.names[i]] == undefined) {
        missing.push(x.names[i]);
      }
    }
    res.send({
      statusCode: 200,
      data: missing,
      msg: "Missing studnets fetched succusfully",
    });
  } catch {
    res.send({
      statusCode: 300,
      data: [],
      msg: " Missing Student not foound",
    });
  }
};
