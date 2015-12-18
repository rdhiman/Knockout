// test("Test model", function () {
//     var model, viewmodel;

//     viewmodel = youtubeResultsModel(model);

//     deepEqual(viewmodel, model);
// });
var vm;
    module( "YoutubeResultsModel", {
        setup: function() {
            vm = new youtubeResultsModel();
        },
        teardown: function() { }
    });

test('Can create YoutubeResultsModel', function () {
    ok(typeof vm !== 'undefined');
});

