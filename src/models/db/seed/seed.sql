INSERT INTO cities
  (name, image_url)
VALUES
  ('Oakland', 'https://2sltl91mfmb53nr7sf3j0zxj-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/DowntownOakland_ViaAlameda_MRP_Web_2000x713_rev3_10x4.jpg'),
  ('Quebec',
  'http://wallpul.info/i/2016/12/wallpapers-4k-city-wallpaper-inspiring-4k-quebec-city-wallpaper-free-4k-wallpaper-hd-wallpapers.jpg'),
  ('London', 'http://wallup.net/wp-content/uploads/2016/05/02/147814-London-River_Thames-Westminster-Big_Ben-bridge.jpg'
  ),
  ('Gibraltar', 'https://a.travel-assets.com/findyours-php/viewfinder/images/res60/202000/202241-Gibraltar-All.jpg'
  )
;

INSERT INTO users
  (email, password, name, date_joined, current_city)
VALUES
  ('monica@monica.com', '$2a$10$R5U.DZ65POb9/kWqvR94DOnRIjU.p5iuZGU0I0TkuCvxwBrySQC0O', 'Monica', '2017-10-03', 'Oakland'),
  ('somaya@somaya.com', '$2a$10$dbOW6pfarskkvO5eW234OuHWW/hVAMUWmhHOokvfYvuWXvQefKLzS', 'Somaya', '2017-10-03', 'Oakland')
;

INSERT INTO posts
  (title, content, user_id, city_id, rating)
VALUES
  ('Lake Merritt', 'This is a lovely little lake smack dab in the middle of Oakland. There is so much to do here. You can take kayak classes or rowing. It is nice to jog or walk around. There are even gondola rides. Go rent some boats!', 1, 1, 4),
  ('Swans Market', 'Great place to people watch and eat good food. Lots of places to eat. Close to main streets in downtown Oakland. **Dog friendly!', 1, 1, 4),
  ('Château Frontenac', 'This Grand Dame hotel was built by the Canadian Pacific Railway in 1893; they truly don’t build them like this any more. There is a reason why it is the most photographed hotel in the world! The old world elegance and charm is matched with all the mod cons (wifi, rainfall shower head etc) and service you expect from a Fairmont property. We were in a deluxe room overlooking the river, breathtaking! We can’t imagine staying anywhere when visiting beautiful Quebec City!', 2, 2, 5),
  ('Chutes Montmorency', 'Breathtaking and beautiful.
This waterfall happens to be taller than Niagara Falls.
They have created an excellent walkway which allows you to get close to the falls and to take it in from various vantage points.
Being off-season, parking was free...otherwise, I believe it is $9-$12 dollars.
Also, there is a zip line that goes ACROSS the falls!! So cool!
Driving past the falls at night, they are lit and beautiful to see from a distance.
Well worth the visit!', 2, 2, 5),
  ('Buckingham Palace', 'The State Rooms are only open in August when the Queen is in Scotland. They were a true wonder to visit. The tours are timed tickets, purchase well in advance of your trip, they run very smoothly and they do not over sell tickets making the entire tour very enjoyable because you have plenty of room to move around and see everything you would like. No photography in the Palace means you do not have to worry about others stopping in front of you, the audio guide is very well done and easy to use. A must see when you are in London!', 2, 3, 4)
;

INSERT INTO comments
  (comment, post_id, user_id)
VALUES
  ('I wanna go!', 4, 1),
  ('Rented a pedal boat, it was great!', 1, 2),
  ('Fancy!', 3, 1),
  ('Kayaks are also great.', 1, 1),
  ('Wow!', 3, 2)
;
