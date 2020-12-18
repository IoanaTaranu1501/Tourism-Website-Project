(function($) {
    var commentsList = $('#commentsList');
    var addCommentForm = $('#add-comment-form');
    var newComment = $('#new-comment-input');
    var newCommentButton = $('#new-comment-submit');
    var attractionId = $('#attractionId-add-travelogue');
    var ratingFromComment = $('#input-comment-attraction-rating');
    var rating = $('#detail-attration-rating');

    function appendComments(List) {
        for (var i of List) {
            let user = "<dt> From:" + i.user + "</dt>";
            let rating = "<dd> Rating:" + i.rating + "</dd>";
            let content = "<dd> Content:" + i.comment + "</dd>";
            commentsList.append("<div class=\"comment-card\">" + user + rating + content + "</div>");
        }
    }

    function addComment(item) {
        if (item[0].error) {
            if (item[0].error == "already") {
                alert("You already commented this attraction!");
                return;
            }
            if (item[0].error == "notLogIn") {
                window.location.href = "/users/login";
                return;
            }
        }
        if (item) {
            rating.html(item[0].newRating);
            let commentUser = "<dt> From:" + item[0].user + "</dt>";
            let commentArating = "<dd> Rating:" + item[0].rating + "</dd>";
            let commentContent = "<dd> Content:" + item[0].comment + "</dd>";
            commentsList.append("<div class=\"comment-card\">" + commentUser + commentArating + commentContent + "</div>");
        } else {
            return;
        }
    }

    var requestConfig = {
        method: 'GET',
        url: '/api/comments/' + attractionId.val()
    };
    $.ajax(requestConfig).then(function(responseMessage) {
        var newElement = $(responseMessage);
        commentsList.empty();
        appendComments(newElement);
    });



    newCommentButton.on('click', function(event) {
        event.preventDefault();
        if (ratingFromComment.val() > 5 || ratingFromComment.val() < 0) {
            alert("rating must in the range of 0 to 5!");
            return;
        }
        var commentContent = $('#input-comment-attraction-rating');
        var commentRating = $('#new-comment-input');
        if($.trim(commentContent.val())=="" || $.trim(commentRating.val())==""){
            alert("please enter non-space input");
            return false;
        }
        var requestConfig = {
            method: 'POST',
            url: '/api/addComment',
            data: { comment: newComment.val(), rating: ratingFromComment.val(), attractionId: attractionId.val() },
            dataType: "json",
            success: function(data) {},
            error: function(err) {}

        }
        $.ajax(requestConfig).then(function(responseMessage) {
            var newElement = $(responseMessage);
            newComment.val('');
            ratingFromComment.val('');
            addComment(newElement);
        })
    });
})(window.jQuery);