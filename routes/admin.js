router.get("/login", (req, res) => {

    const filePath = path.join(
        __dirname,
        "../admin/login.html"
    );

    console.log(filePath);

    res.sendFile(filePath);

});