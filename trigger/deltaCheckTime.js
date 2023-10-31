// To calculate the difference between the check-in and the check-out i preferred to use a trigger

// this is the code of the trigger which is running on the mongodb to calculate the difference between
// the time of the check-in and the check-out

exports = function (changeEvent) {
  const fullDocument = changeEvent.fullDocument

  const checkInTime = new Date(fullDocument.checkInTime)
  const checkOutTime = new Date(fullDocument.checkOutTime)

  const deltaTimeCheck = new Date(checkOutTime - checkInTime)

  // console.log(deltaTimeCheck)

  const collection = context.services
    .get('Cluster0')
    .db('test')
    .collection('checks')

  collection.updateOne(
    { _id: changeEvent.documentKey._id },
    { $set: { deltaTimeCheck } },
    function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('Document updated')
      }
    }
  )
}
