const config = require('config.json');
const db = require('../db');
const Tables = db.Tables;

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function getAll(assignedTo) {
    if (assignedTo==="undefined") return await Tables.find();
    else return await Tables.find({assignedTo});
}

async function getById(tableId) {
    return Tables.findOne({tableId: tableId});
}

async function create(tableParam) {
    if (await Tables.findOne({ tableId: tableParam.tableId })) {
        throw 'Il numero del tavolo " ' + tableParam.tableId + ' " è già stato preso';
    }

    return new Tables(tableParam).save();

    // save table
    //await table.save();
}

async function update(tableId, tableParam) {

    const table = await Tables.findById(tableId);

    console.log(tableParam)
    // validate
    if (!table) throw 'table not found';
    
    // copy tableParam properties to table
    Object.assign(table, tableParam);

    await table.save();
}

async function _delete(tableId) {
    await Tables.findByIdAndRemove(tableId);
}