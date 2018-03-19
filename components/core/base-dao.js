
class BaseDAO {
    constructor(collection) {
        this.collection = collection;
    }

    getDataById(id, options) {
        options = options || {};
        if (!this.collection) {
            throw 'DAO contract violation';
        }

        return this.collection.findOne({_id: id});
    }

    getOneData(query, options) {
        query = query || {};
        options = options || {};
        if (!this.collection) {
            throw 'DAO contract violation';
        }
        return this.collection.findOne(query);
    }

    getData(query, options) {
        console.log('== get data in BaseDAO ==');
        query = query || {};
        options = options || {};
        if (options.limit === undefined || options.limit === null ||
            options.offset === undefined || options.offset === null) {
                console.log('ATTENTION!!! DAO contract violation at getData');
                throw('DAO contract violation');
            }
        if (!this.collection) {
            throw 'DAO contract violation';
        }
        return this.collection.find(query)
                                .skip(options.offset)
                                .limit(options.limit)
                                .exec();
    }

    insertData(query, options) {
        query = query || {};
        options = options || {};
        console.log('== insert data in BaseDAO == ');
        if (!this.collection) {
            throw 'Contract violation';
        }
        return this.collection.create(query);
    }

    updateData(id, query, options) {
        query = query || {};
        options = options || {};
        console.log('== update data in BaseDAO == ');
        if (!this.collection) {
            throw 'Contract violation';
        }
        return this.collection.update({_id: id}, {$set: query})
    }

    removeData(query, options) {
        query = query || {};
        options = options || {};
        console.log('== remove data in BaseDAO == ');
        if (!this.collection) {
            throw 'Contract violation';
        }
        return this.collection.remove(query);
    }

}

module.exports = BaseDAO;
