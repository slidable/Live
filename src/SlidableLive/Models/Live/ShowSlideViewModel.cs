﻿using System;

namespace SlidableLive.Models.Live
{
    public class ShowSlideViewModel
    {
        public string Presenter { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public DateTimeOffset Time { get; set; }
        public string Place { get; set; }
        public int SlideNumber { get; set; }
    }
}