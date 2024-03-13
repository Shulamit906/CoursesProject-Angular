namespace AngularServer
{
    public class Category
    {
        static int index = 0;
        public int id { get; set; }
        public string name { get; set; }
        public string iconPath { get; set; }
        public Category( string name, string iconPath)
        {
            this.id = ++index;
            this.name = name;
            this.iconPath = iconPath;
        }
    }
}
