# rails7-1-trix2-color-picker-repro

Reproduction repo for [issuecomment-1869019780](https://github.com/basecamp/trix/issues/985#issuecomment-1869019780)

This is an example repo to reproduce the following issue:

The second stimulus code for the color picker do not initialize the Trix editor on Rails 7.1.2 with Trix 2.0.8. It does not initially (at the first editor page loading) show the color tool buttons and color span tags (missing) on the rich_text_area and the trix-before-initialize event does not occur. If the editor page is refreshed by browser button, the event occurs and the color tool buttons are shown and work properly.

I hope this is helpful. Thanks!

## Prerequisites

Node.js and Yarn need to be installed on your system because the application uses ESbuild  
Ruby 3.2.1  

## Setup (an example with RVM)
```
git clone https://github.com/chiaki8/rails7-1-trix2-color-picker-repro.git  
cd rails7-1-trix2-color-picker-repro  
rails7-1-trix2-color-picker-repro % rvm use ruby-3.2.1@trix_color_picker_pepro --ruby-version --create  
rails7-1-trix2-color-picker-repro % bundle install --without production  
rails7-1-trix2-color-picker-repro % ./bin/rails db:migrate  
rails7-1-trix2-color-picker-repro % ./bin/rails db:seed  
rails7-1-trix2-color-picker-repro % ./bin/rails javascript:install:esbuild   
```
## Run application
```
rails7-1-trix2-color-picker-repro % ./bin/dev
```
