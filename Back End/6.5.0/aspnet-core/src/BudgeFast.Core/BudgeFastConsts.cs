using BudgeFast.Debugging;

namespace BudgeFast
{
    public class BudgeFastConsts
    {
        public const string LocalizationSourceName = "BudgeFast";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "3fd5243aed7b47aba20b6e9f8e5e3a77";
    }
}
