var db = window.openDatabase("kfc_shop", "1.0", "KFC Shop", 200000);

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
}

function fetch_transaction_success(name) {
    log(`INFO`, `Insert"${name}" successfully.`);
}

function table_transaction_success(table) {
    log(`INFO`, `Create table "${table}" successfully.`);
}

function transaction_error(tx, error) {
    log (`ERROR`, `SQL Error ${error.code}: ${error.message}.`);
}

function initialize_database() {
    db.transaction(function (tx)
    {
        var query = `CREATE TABLE IF NOT EXISTS city (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL)`;

            tx.executeSql(query, [], table_transaction_success("city"), transaction_error);

            
        var query = `CREATE TABLE IF NOT EXISTS district (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            city_id INTEGER NOT NULL,
            FOREIGN KEY (city_id) REFERENCES city(id))`;

            tx.executeSql(query, [], table_transaction_success("district"), transaction_error);

            
        var query = `CREATE TABLE IF NOT EXISTS ward (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            district_id INTEGER NOT NULL,
            FOREIGN KEY (district_id) REFERENCES district(id))`;

            tx.executeSql(query, [], table_transaction_success("ward"), transaction_error);

            
        var query = `CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT NULL,
            parent_id INTEGER NULL,
            FOREIGN KEY (parent_id) REFERENCES category(id))`;

            tx.executeSql(query, [], table_transaction_success("category"), transaction_error);

           
        var query = `CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT NULL,
            price REAL NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES category(id))`;

            tx.executeSql(query, [], table_transaction_success("product"), transaction_error);

            
        var query = `CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            account_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (account_id) REFERENCES account(id),
            FOREIGN KEY (product_id) REFERENCES product(id))`;

            tx.executeSql(query, [], table_transaction_success("cart"), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS account (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            firstname TEXT NULL,
            lastname TEXT NULL,
            birthday REAL NUL,
            phone TEXT NULL,
            street TEXT NULL,
            ward_id INTEGER NULL,
            district_id INTEGER NULL,
            city_id INTEGER NULL,
            status INTEGER NOT NULL,
            FOREIGN KEY (district_id) REFERENCES district(id),
            FOREIGN KEY (ward_id) REFERENCES ward(id),
            FOREIGN KEY (city_id) REFERENCES city(id))`;

            tx.executeSql(query, [], table_transaction_success("account"), transaction_error);
           
    });
}

function fetch_database() {
    db.transaction(function (tx) {
        var query = "INSERT INTO category (name, description) VALUES (?, ?)";

        tx.executeSql(query, ["Category 01", "Category Description 01"], fetch_transaction_success("Category 01"), transaction_error);
        tx.executeSql(query, ["Category 02", "Category Description 02"], fetch_transaction_success("Category 02"), transaction_error);
        tx.executeSql(query, ["Category 03", "Category Description 03"], fetch_transaction_success("Category 03"), transaction_error);

        var query = "INSERT INTO product (name, description, price, category_id) VALUES (?, ?, ?, ?)";

        tx.executeSql(query, ["Product 01", "Description 01", 77000, 1], fetch_transaction_success("Product 01"), transaction_error);
        tx.executeSql(query, ["Product 02", "Description 02", 77000, 1], fetch_transaction_success("Product 02"), transaction_error);
        tx.executeSql(query, ["Product 03", "Description 03", 83000, 2], fetch_transaction_success("Product 03"), transaction_error);
        tx.executeSql(query, ["Product 04", "Description 04", 83000, 2], fetch_transaction_success("Product 04"), transaction_error);
        tx.executeSql(query, ["Product 05", "Description 05", 87000, 3], fetch_transaction_success("Product 05"), transaction_error);
        tx.executeSql(query, ["Product 06", "Description 06", 93000, 3], fetch_transaction_success("Product 06"), transaction_error);

        var query = "INSERT INTO account (username, password, status) VALUES (?, ?, 1)";

        tx.executeSql(query, ["huan@gmail.com", "12345"], fetch_transaction_success("huan@gmail.com"), transaction_error);
    });
}   