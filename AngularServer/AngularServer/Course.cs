namespace AngularServer
{
    public enum LearningMode { FRONTAL = 1, ZOOM = 2 };

    public class Course
    {
        static int index = 0;
        public int id { get; set; }
        public string name { get; set; }
        public int categoryId { get; set; }
        public int lessonCount { get; set; }
        public DateTime startDate { get; set; }
        public string[] syllabus { get; set; }
        public LearningMode learningMode { get; set; }
        public int lecturerId { get; set; }
        public string image { get; set; }
        public Course( string name, int categoryId, int lessonCount, DateTime startDate, string[] syllabus, LearningMode learningMode, int lecturerId, string image)
        {
            this.id = ++index;
            this.name = name;
            this.categoryId = categoryId;
            this.lessonCount = lessonCount;
            this.startDate = startDate;
            this.syllabus = syllabus;
            this.learningMode = learningMode;
            this.lecturerId = lecturerId;
            this.image = image;
        }
    }
}
