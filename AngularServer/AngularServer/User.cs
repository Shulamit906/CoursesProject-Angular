namespace AngularServer
{
    public class User
    {
        static int index = 0;
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public User( string name, string address, string email, string password)
        {
            this.id = ++index;
            this.name = name;
            this.address = address;
            this.email = email;
            this.password = password;
        }
        public User()
        {

        }
    }
}
