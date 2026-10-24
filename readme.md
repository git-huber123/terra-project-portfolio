# My Project Portfolio (or Project Portfolio)

This is my project portfolio. You can try it out at https://git-huber123.github.io/terra-project-portfolio/

It's basically a webpage so you can see all of the cool things that I've done before

For usage instructions, just look around, scroll, and click on the projects to expand them and see the full view

I also added a Terra calculator, allowing you to see how many coins you'll get if you work for X hours / day, you can change it per-day.

For the rainbow view, it's pretty simple, just a satisfying grid.

But the real keystone is the raycaster: It went through a lot of optimization - first, I changed the step rate, then instead of stepping down the ray I calculated the intersection point for each rectangle, then instead of trying to
find the rectangles intersecting with a ray, I only casted rays for cells that would actually hit rectangles, as well as other optimization. I added fall damage, a healthbar, an inventory, and different types of items that save their color when
you place them down.
