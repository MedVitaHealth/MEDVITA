import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.fragment.app.FragmentActivity
import com.example.medx.UI.fragments.CompletedFragment
import com.example.medx.UI.fragments.RemainingFragment

class ViewPagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {
    override fun getItemCount(): Int = 2 // We have two tabs

    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> RemainingFragment() // Position 0 for Remaining
            else -> CompletedFragment() // Position 1 for Completed
        }
    }
}
