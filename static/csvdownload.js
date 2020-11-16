function csv_download(){
                $.ajax({
                    type: "GET",
                    url: "/getcsv",
                    success: function (data) {
                        $("#result").html("dfsdfds")
                  },
                });
            }
