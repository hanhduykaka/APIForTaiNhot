
var fs = require("fs");
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

app.get('/getSanPham', function (req, res) {
    var data = fs.readFileSync("./du_lieu/san_pham.json");

    res.end(data);
});

app.get('/getCaSuy/:val', function (req, res) {
    var pageIndex = req.params.val;
    var data = fs.readFileSync("./du_lieu/album.json");
    res.end(data);
});

app.post('/postPlus', function (req, res) {
    if (req.body.a * 1 > 0 && req.body.b * 1 > 0) {
        var total = req.body.a + req.body.b;
        var obj = {
            "total": total
        };
        res.end(
            JSON.stringify(obj)
        );
    }
    else {
        res.end("please try correct input");
    }
});

app.get('*', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('content-type', 'application/json');
    res.end("Please try again with another source api");
});



// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    // You can now play with your datas
}

function getPaginatedItems(items, page) {
    console.log(items)
    var page = page || 1,
        per_page = 3,
        offset = (page - 1) * per_page,
        paginatedItems = _.rest(items, offset).slice(0, per_page);
    return {
        page: page,
        per_page: per_page,
        total: items.length,
        total_pages: Math.ceil(items.length / per_page),
        data: paginatedItems
    };
}


app.listen(process.env.PORT || 5000);