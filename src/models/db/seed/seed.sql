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
  (title, content, user_id, city_id)
VALUES
  ('Lake Merritt', 'Go rent some boats!', 1, 1),
  ('Swans Market', 'Great food. Something for everyone. **Dog friendly!', 1, 1),
  ('Château Frontenac', 'Most photographed hotel in the world. Go spend the night!', 2, 2),
  ('Chutes Montmorency', 'Taller than Niagara Falls. Go try the zip line!', 2, 2),
  ('Buckingham Palace', 'Go visit in August when the queen is traveling. Beautiful gardens.', 2, 3)
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
